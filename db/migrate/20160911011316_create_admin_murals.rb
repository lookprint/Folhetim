class CreateAdminMurals < ActiveRecord::Migration[5.0]
  def change
    create_table :admin_murals do |t|
      t.string :text
      t.string :title

      t.timestamps
    end
  end
end
