class AddDepartmentToMurals < ActiveRecord::Migration[5.0]
  def change
    add_reference :admin_murals, :admin_department, foreign_key: true
  end
end
