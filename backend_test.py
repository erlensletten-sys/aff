#!/usr/bin/env python3
"""
Backend API Testing for GambleVerify Platform
Tests all authentication, verification, and statistics endpoints
"""

import requests
import sys
import json
import time
from datetime import datetime

class GambleVerifyAPITester:
    def __init__(self, base_url="https://gamble-verify.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASSED" if success else "❌ FAILED"
        print(f"{status} - {name}")
        if details:
            print(f"    Details: {details}")

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if headers:
            test_headers.update(headers)
        
        if self.token and 'Authorization' not in test_headers:
            test_headers['Authorization'] = f'Bearer {self.token}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}

            details = f"Status: {response.status_code}, Response: {json.dumps(response_data, indent=2)[:200]}..."
            self.log_test(name, success, details)
            
            return success, response_data

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test system health endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )

    def test_user_registration(self):
        """Test user registration"""
        test_user_data = {
            "username": f"testuser_{int(time.time())}",
            "email": f"test_{int(time.time())}@example.com",
            "full_name": "Test User",
            "password": "TestPassword123!"
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            201,
            data=test_user_data
        )
        
        if success:
            self.test_email = test_user_data["email"]
            self.test_password = test_user_data["password"]
        
        return success, response

    def test_user_login_unverified(self):
        """Test login with unverified email (should fail)"""
        if not hasattr(self, 'test_email'):
            self.log_test("Login Unverified Email", False, "No test user created")
            return False, {}
        
        login_data = {
            "email": self.test_email,
            "password": self.test_password
        }
        
        return self.run_test(
            "Login Unverified Email",
            "POST",
            "auth/login",
            403,  # Should fail with 403 for unverified email
            data=login_data
        )

    def test_duplicate_registration(self):
        """Test duplicate user registration (should fail)"""
        if not hasattr(self, 'test_email'):
            self.log_test("Duplicate Registration", False, "No test user created")
            return False, {}
        
        duplicate_data = {
            "username": "different_username",
            "email": self.test_email,  # Same email
            "full_name": "Different User",
            "password": "DifferentPassword123!"
        }
        
        return self.run_test(
            "Duplicate Registration",
            "POST",
            "auth/register",
            400,  # Should fail with 400
            data=duplicate_data
        )

    def test_invalid_login(self):
        """Test login with invalid credentials"""
        invalid_data = {
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        }
        
        return self.run_test(
            "Invalid Login",
            "POST",
            "auth/login",
            401,  # Should fail with 401
            data=invalid_data
        )

    def test_statistics_endpoint(self):
        """Test public statistics endpoint"""
        return self.run_test(
            "Statistics Endpoint",
            "GET",
            "stats",
            200
        )

    def test_verification_logging(self):
        """Test verification logging endpoint"""
        # This endpoint expects query parameters, not JSON body
        url = f"{self.base_url}/api/verify/log?game_type=HMAC-SHA256&result=success&duration_ms=1500&module_used=HMAC-SHA256"
        
        try:
            response = requests.post(url, headers={'Content-Type': 'application/json'}, timeout=10)
            success = response.status_code == 200
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}

            details = f"Status: {response.status_code}, Response: {json.dumps(response_data, indent=2)[:200]}..."
            self.log_test("Verification Logging", success, details)
            
            return success, response_data

        except Exception as e:
            self.log_test("Verification Logging", False, f"Exception: {str(e)}")
            return False, {}

    def test_verification_endpoints(self):
        """Test verification tool endpoints (placeholders)"""
        test_data = {"test": "data"}
        
        # Test HMAC-SHA256 endpoint
        self.run_test(
            "HMAC-SHA256 Verification",
            "POST",
            "verify/hmac-sha256",
            200,
            data=test_data
        )
        
        # Test Provably Fair endpoint
        self.run_test(
            "Provably Fair Verification",
            "POST",
            "verify/provably-fair",
            200,
            data=test_data
        )

    def test_protected_endpoints_without_auth(self):
        """Test protected endpoints without authentication"""
        # Test /me endpoint without token
        self.run_test(
            "Get User Info (No Auth)",
            "GET",
            "auth/me",
            401,  # Should fail without auth
            headers={'Authorization': ''}  # Override auth header
        )

    def test_email_verification_invalid_token(self):
        """Test email verification with invalid token"""
        invalid_token_data = {
            "token": "invalid_token_12345"
        }
        
        return self.run_test(
            "Email Verification (Invalid Token)",
            "POST",
            "auth/verify-email",
            400,  # Should fail with 400
            data=invalid_token_data
        )

    def run_all_tests(self):
        """Run comprehensive API test suite"""
        print("🚀 Starting GambleVerify API Testing...")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Basic connectivity and health
        self.test_health_check()
        
        # Authentication flow
        self.test_user_registration()
        self.test_user_login_unverified()
        self.test_duplicate_registration()
        self.test_invalid_login()
        
        # Email verification
        self.test_email_verification_invalid_token()
        
        # Public endpoints
        self.test_statistics_endpoint()
        self.test_verification_logging()
        self.test_verification_endpoints()
        
        # Protected endpoints
        self.test_protected_endpoints_without_auth()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 TEST SUMMARY")
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        # Return results for further processing
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": round(self.tests_passed/self.tests_run*100, 1),
            "test_results": self.test_results
        }

def main():
    """Main test execution"""
    tester = GambleVerifyAPITester()
    results = tester.run_all_tests()
    
    # Exit with appropriate code
    if results["failed_tests"] == 0:
        print("\n🎉 All tests passed!")
        return 0
    else:
        print(f"\n⚠️  {results['failed_tests']} test(s) failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())