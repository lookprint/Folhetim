json.extract! admin_department, :id, :name, :num_block, :responsible, :phone, :address, :created_at, :updated_at
json.url admin_department_url(admin_department, format: :json)