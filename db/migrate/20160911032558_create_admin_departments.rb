class CreateAdminDepartments < ActiveRecord::Migration[5.0]
  def change
    create_table :admin_departments do |t|
      t.string :name
      t.integer :num_block
      t.string :responsible
      t.string :phone
      t.string :address

      t.timestamps
    end
  end
end
