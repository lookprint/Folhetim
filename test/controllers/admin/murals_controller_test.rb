require 'test_helper'

class Admin::MuralsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_mural = admin_murals(:one)
  end

  test "should get index" do
    get admin_murals_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_mural_url
    assert_response :success
  end

  test "should create admin_mural" do
    assert_difference('Admin::Mural.count') do
      post admin_murals_url, params: { admin_mural: { text: @admin_mural.text, title: @admin_mural.title } }
    end

    assert_redirected_to admin_mural_url(Admin::Mural.last)
  end

  test "should show admin_mural" do
    get admin_mural_url(@admin_mural)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_mural_url(@admin_mural)
    assert_response :success
  end

  test "should update admin_mural" do
    patch admin_mural_url(@admin_mural), params: { admin_mural: { text: @admin_mural.text, title: @admin_mural.title } }
    assert_redirected_to admin_mural_url(@admin_mural)
  end

  test "should destroy admin_mural" do
    assert_difference('Admin::Mural.count', -1) do
      delete admin_mural_url(@admin_mural)
    end

    assert_redirected_to admin_murals_url
  end
end
