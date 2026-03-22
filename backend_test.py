#!/usr/bin/env python3
"""
Backend API Testing for NoToGreed Platform
Tests all authentication, verification, statistics, and promotions endpoints
"""

import requests
import sys
import json
import time
from datetime import datetime

class NoToGreedAPITester:
    def __init__(self, base_url="https://vip-engine-test.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.admin_token = None
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

    def test_admin_registration_and_login(self):
        """Test admin user registration and login"""
        admin_user_data = {
            "username": f"admin_{int(time.time())}",
            "email": "admin@notogreed.com",  # Admin email
            "full_name": "Admin User",
            "password": "AdminPassword123!"
        }
        
        # Register admin user
        success, response = self.run_test(
            "Admin Registration",
            "POST",
            "auth/register",
            201,
            data=admin_user_data
        )
        
        if success:
            self.admin_email = admin_user_data["email"]
            self.admin_password = admin_user_data["password"]
            
            # Manually verify admin email for testing (in real scenario, this would be done via email)
            # For testing purposes, we'll assume the admin is verified
            
        return success, response

    def test_admin_login(self):
        """Test admin login (assuming email is verified)"""
        if not hasattr(self, 'admin_email'):
            self.log_test("Admin Login", False, "No admin user created")
            return False, {}
        
        login_data = {
            "email": self.admin_email,
            "password": self.admin_password
        }
        
        # Note: This will fail if email is not verified, but we'll test it anyway
        success, response = self.run_test(
            "Admin Login (May Fail - Email Not Verified)",
            "POST",
            "auth/login",
            200,  # Expecting success if verified
            data=login_data
        )
        
        if success and 'access_token' in response:
            self.admin_token = response['access_token']
        
        return success, response

    def test_admin_check_endpoint(self):
        """Test admin check endpoint"""
        if not self.admin_token:
            self.log_test("Admin Check", False, "No admin token available")
            return False, {}
        
        return self.run_test(
            "Admin Check",
            "GET",
            "admin/check",
            200,
            headers={'Authorization': f'Bearer {self.admin_token}'}
        )

    def test_promotions_without_auth(self):
        """Test promotions endpoint without authentication"""
        return self.run_test(
            "Promotions (No Auth)",
            "GET",
            "promotions",
            401,  # Should fail without auth
            headers={'Authorization': ''}
        )

    def test_promotions_with_auth(self):
        """Test promotions endpoint with authentication"""
        if not self.token:
            self.log_test("Promotions (With Auth)", False, "No user token available")
            return False, {}
        
        return self.run_test(
            "Promotions (With Auth)",
            "GET",
            "promotions",
            200,
            headers={'Authorization': f'Bearer {self.token}'}
        )

    def test_create_promotion_non_admin(self):
        """Test creating promotion with non-admin user"""
        if not self.token:
            self.log_test("Create Promotion (Non-Admin)", False, "No user token available")
            return False, {}
        
        promotion_data = {
            "title": "Test Promotion",
            "description": "This is a test promotion",
            "code": "TEST123",
            "link": "https://example.com"
        }
        
        return self.run_test(
            "Create Promotion (Non-Admin)",
            "POST",
            "admin/promotions",
            403,  # Should fail with 403 for non-admin
            data=promotion_data,
            headers={'Authorization': f'Bearer {self.token}'}
        )

    def test_create_promotion_admin(self):
        """Test creating promotion with admin user"""
        if not self.admin_token:
            self.log_test("Create Promotion (Admin)", False, "No admin token available")
            return False, {}
        
        promotion_data = {
            "title": f"Admin Test Promotion {int(time.time())}",
            "description": "This is an admin test promotion",
            "code": f"ADMIN{int(time.time())}",
            "link": "https://example.com",
            "image_url": "https://via.placeholder.com/300x200"
        }
        
        success, response = self.run_test(
            "Create Promotion (Admin)",
            "POST",
            "admin/promotions",
            200,
            data=promotion_data,
            headers={'Authorization': f'Bearer {self.admin_token}'}
        )
        
        if success:
            self.test_promotion_title = promotion_data["title"]
        
        return success, response

    def test_delete_promotion_admin(self):
        """Test deleting promotion with admin user"""
        if not self.admin_token or not hasattr(self, 'test_promotion_title'):
            self.log_test("Delete Promotion (Admin)", False, "No admin token or promotion to delete")
            return False, {}
        
        return self.run_test(
            "Delete Promotion (Admin)",
            "DELETE",
            f"admin/promotions/{self.test_promotion_title}",
            200,
            headers={'Authorization': f'Bearer {self.admin_token}'}
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
        print("🚀 Starting NoToGreed API Testing...")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Basic connectivity and health
        self.test_health_check()
        
        # Authentication flow
        self.test_user_registration()
        self.test_user_login_unverified()
        self.test_duplicate_registration()
        self.test_invalid_login()
        
        # Admin authentication flow
        self.test_admin_registration_and_login()
        self.test_admin_login()
        self.test_admin_check_endpoint()
        
        # Email verification
        self.test_email_verification_invalid_token()
        
        # Public endpoints
        self.test_statistics_endpoint()
        self.test_verification_logging()
        self.test_verification_endpoints()
        
        # Protected endpoints
        self.test_protected_endpoints_without_auth()
        
        # Promotions endpoints
        self.test_promotions_without_auth()
        self.test_promotions_with_auth()
        self.test_create_promotion_non_admin()
        self.test_create_promotion_admin()
        self.test_delete_promotion_admin()
        
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
    tester = NoToGreedAPITester()
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