"""
Test suite for Rakestake rebrand and VIP features
Tests VIP campaigns API, featured campaigns, and search functionality
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndBasicAPIs:
    """Basic health check and API availability tests"""
    
    def test_health_endpoint(self):
        """Test health endpoint returns SYSTEM_ONLINE"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "SYSTEM_ONLINE"
        print(f"✅ Health check passed: {data['status']}")
    
    def test_providers_endpoint(self):
        """Test providers endpoint returns list of providers"""
        response = requests.get(f"{BASE_URL}/api/providers")
        assert response.status_code == 200
        data = response.json()
        assert "providers" in data
        assert len(data["providers"]) > 0
        print(f"✅ Providers endpoint passed: {len(data['providers'])} providers found")


class TestVIPCampaigns:
    """VIP campaigns API tests"""
    
    def test_get_all_vip_campaigns(self):
        """Test getting all VIP campaigns"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        assert response.status_code == 200
        data = response.json()
        assert "campaigns" in data
        campaigns = data["campaigns"]
        assert len(campaigns) == 5, f"Expected 5 campaigns, got {len(campaigns)}"
        print(f"✅ VIP campaigns endpoint passed: {len(campaigns)} campaigns found")
        
        # Verify campaign structure
        for campaign in campaigns:
            assert "casino_name" in campaign
            assert "casino_slug" in campaign
            assert "bonus_value" in campaign
            assert "exclusive_extra" in campaign
    
    def test_get_featured_vip_campaigns(self):
        """Test getting featured VIP campaigns"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns/featured")
        assert response.status_code == 200
        data = response.json()
        assert "campaigns" in data
        campaigns = data["campaigns"]
        assert len(campaigns) == 2, f"Expected 2 featured campaigns, got {len(campaigns)}"
        
        # Verify all returned campaigns are featured
        for campaign in campaigns:
            assert campaign["is_featured"] == True
        print(f"✅ Featured campaigns endpoint passed: {len(campaigns)} featured campaigns")
    
    def test_exclusive_extras_contain_rakestake(self):
        """Test that exclusive extras now say 'Rakestake' instead of 'NoToGreed'"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        assert response.status_code == 200
        data = response.json()
        campaigns = data["campaigns"]
        
        rakestake_count = 0
        notogreed_count = 0
        
        for campaign in campaigns:
            extra = campaign.get("exclusive_extra", "")
            if "Rakestake" in extra:
                rakestake_count += 1
            if "NoToGreed" in extra:
                notogreed_count += 1
        
        # At least some campaigns should have Rakestake in exclusive_extra
        assert rakestake_count > 0, "No campaigns have 'Rakestake' in exclusive_extra"
        assert notogreed_count == 0, f"Found {notogreed_count} campaigns still using 'NoToGreed'"
        print(f"✅ Rakestake branding in exclusive extras: {rakestake_count} campaigns updated")
    
    def test_campaign_casino_names(self):
        """Test that all expected casinos are present"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        assert response.status_code == 200
        data = response.json()
        campaigns = data["campaigns"]
        
        expected_casinos = ["Stake.com", "BC.Game", "Shuffle.com", "Roobet", "Rollbit"]
        found_casinos = [c["casino_name"] for c in campaigns]
        
        for casino in expected_casinos:
            assert casino in found_casinos, f"Casino {casino} not found in campaigns"
        
        print(f"✅ All expected casinos present: {', '.join(expected_casinos)}")
    
    def test_campaign_sort_order(self):
        """Test that campaigns are sorted by sort_order"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        assert response.status_code == 200
        data = response.json()
        campaigns = data["campaigns"]
        
        sort_orders = [c["sort_order"] for c in campaigns]
        assert sort_orders == sorted(sort_orders), "Campaigns are not sorted by sort_order"
        print(f"✅ Campaigns sorted correctly: {sort_orders}")


class TestSearchFunctionality:
    """Test search/filter functionality for casinos"""
    
    def test_search_stake_returns_one_result(self):
        """Test that searching for 'stake' returns only Stake.com"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        assert response.status_code == 200
        data = response.json()
        campaigns = data["campaigns"]
        
        # Simulate frontend search filter
        search_query = "stake"
        filtered = [c for c in campaigns if search_query.lower() in c["casino_name"].lower()]
        
        assert len(filtered) == 1, f"Expected 1 result for 'stake', got {len(filtered)}"
        assert filtered[0]["casino_name"] == "Stake.com"
        print(f"✅ Search 'stake' returns only Stake.com")
    
    def test_search_bc_returns_one_result(self):
        """Test that searching for 'bc' returns only BC.Game"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        assert response.status_code == 200
        data = response.json()
        campaigns = data["campaigns"]
        
        search_query = "bc"
        filtered = [c for c in campaigns if search_query.lower() in c["casino_name"].lower()]
        
        assert len(filtered) == 1, f"Expected 1 result for 'bc', got {len(filtered)}"
        assert filtered[0]["casino_name"] == "BC.Game"
        print(f"✅ Search 'bc' returns only BC.Game")
    
    def test_search_empty_returns_all(self):
        """Test that empty search returns all casinos"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        assert response.status_code == 200
        data = response.json()
        campaigns = data["campaigns"]
        
        search_query = ""
        filtered = [c for c in campaigns if search_query.lower() in c["casino_name"].lower()]
        
        assert len(filtered) == 5, f"Expected 5 results for empty search, got {len(filtered)}"
        print(f"✅ Empty search returns all 5 casinos")


class TestStatisticsAPI:
    """Test statistics endpoint"""
    
    def test_stats_endpoint(self):
        """Test statistics endpoint returns expected data"""
        response = requests.get(f"{BASE_URL}/api/stats")
        assert response.status_code == 200
        data = response.json()
        
        assert "total_verifications" in data
        assert "success_rate" in data
        assert "total_users" in data
        print(f"✅ Stats endpoint passed: {data['total_verifications']} verifications, {data['success_rate']}% success rate")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
