class AddStatusToMurals < ActiveRecord::Migration[5.0]
  def change
    add_column :admin_murals, :status, :string
  end
end
