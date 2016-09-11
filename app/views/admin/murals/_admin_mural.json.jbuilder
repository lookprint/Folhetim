json.extract! admin_mural, :id, :text, :title, :created_at, :updated_at
json.url admin_mural_url(admin_mural, format: :json)