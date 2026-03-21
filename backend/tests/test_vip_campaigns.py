"""
VIP Campaigns API Tests
Tests for VIP Hub feature - public campaign endpoints
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestVIPCampaignsAPI:
    """VIP Campaigns public endpoint tests"""
    
    def test_get_all_campaigns_success(self):
        """Test GET /api/vip/campaigns returns all active campaigns"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        
        # Status code assertion
        assert response.status_code == 200
        
        # Data assertions
        data = response.json()
        assert "campaigns" in data
        campaigns = data["campaigns"]
        
        # Should have 5 seeded campaigns
        assert len(campaigns) == 5
        
        # Verify campaign structure
        for campaign in campaigns:
            assert "casino_name" in campaign
            assert "casino_slug" in campaign
            assert "bonus_title" in campaign
            assert "bonus_value" in campaign
            assert "description" in campaign
            assert "referral_link" in campaign
            assert "is_featured" in campaign
            assert "is_active" in campaign
            assert campaign["is_active"] == True
    
    def test_get_all_campaigns_contains_expected_casinos(self):
        """Test that all expected casinos are present"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        assert response.status_code == 200
        
        data = response.json()
        casino_slugs = [c["casino_slug"] for c in data["campaigns"]]
        
        expected_casinos = ["stake", "bcgame", "shuffle", "roobet", "rollbit"]
        for casino in expected_casinos:
            assert casino in casino_slugs, f"Missing casino: {casino}"
    
    def test_get_featured_campaigns_success(self):
        """Test GET /api/vip/campaigns/featured returns only featured campaigns"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns/featured")
        
        # Status code assertion
        assert response.status_code == 200
        
        # Data assertions
        data = response.json()
        assert "campaigns" in data
        campaigns = data["campaigns"]
        
        # Should have 2 featured campaigns
        assert len(campaigns) == 2
        
        # All returned campaigns should be featured
        for campaign in campaigns:
            assert campaign["is_featured"] == True
    
    def test_featured_campaigns_are_stake_and_bcgame(self):
        """Test that featured campaigns are Stake and BC.Game"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns/featured")
        assert response.status_code == 200
        
        data = response.json()
        featured_slugs = [c["casino_slug"] for c in data["campaigns"]]
        
        assert "stake" in featured_slugs
        assert "bcgame" in featured_slugs
    
    def test_campaign_data_structure_stake(self):
        """Test Stake campaign has correct data structure and values"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        assert response.status_code == 200
        
        data = response.json()
        stake_campaign = next((c for c in data["campaigns"] if c["casino_slug"] == "stake"), None)
        
        assert stake_campaign is not None
        assert stake_campaign["casino_name"] == "Stake.com"
        assert stake_campaign["bonus_title"] == "200% Deposit Bonus"
        assert stake_campaign["bonus_value"] == "Up to $3,000"
        assert stake_campaign["bonus_code"] == "NOTOGREED"
        assert stake_campaign["exclusive_extra"] == "+$25 Free Bet on signup through NoToGreed"
        assert stake_campaign["min_deposit"] == "$20"
        assert stake_campaign["wagering_requirement"] == "40x bonus"
        assert stake_campaign["is_featured"] == True
    
    def test_campaign_data_structure_bcgame(self):
        """Test BC.Game campaign has correct data structure"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        assert response.status_code == 200
        
        data = response.json()
        bcgame_campaign = next((c for c in data["campaigns"] if c["casino_slug"] == "bcgame"), None)
        
        assert bcgame_campaign is not None
        assert bcgame_campaign["casino_name"] == "BC.Game"
        assert bcgame_campaign["bonus_title"] == "300% Welcome Package"
        assert bcgame_campaign["bonus_value"] == "Up to $20,000 + Lucky Spin"
        assert bcgame_campaign["bonus_code"] is None  # BC.Game has no bonus code
        assert bcgame_campaign["exclusive_extra"] == "VIP Fast-Track + Daily Rakeback Boost"
        assert bcgame_campaign["is_featured"] == True
    
    def test_campaigns_sorted_by_sort_order(self):
        """Test that campaigns are returned sorted by sort_order"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        assert response.status_code == 200
        
        data = response.json()
        campaigns = data["campaigns"]
        
        # Verify sort order is ascending
        sort_orders = [c["sort_order"] for c in campaigns]
        assert sort_orders == sorted(sort_orders), "Campaigns should be sorted by sort_order"
    
    def test_campaign_referral_links_present(self):
        """Test that all campaigns have valid referral links"""
        response = requests.get(f"{BASE_URL}/api/vip/campaigns")
        assert response.status_code == 200
        
        data = response.json()
        for campaign in data["campaigns"]:
            assert campaign["referral_link"] is not None
            assert campaign["referral_link"].startswith("https://")
            assert "notogreed" in campaign["referral_link"].lower()


class TestHealthEndpoint:
    """Health check endpoint test"""
    
    def test_health_check(self):
        """Test health endpoint returns online status"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        
        data = response.json()
        assert data["status"] == "SYSTEM_ONLINE"
        assert "timestamp" in data


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
