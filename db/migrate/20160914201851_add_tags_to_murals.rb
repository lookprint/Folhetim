class AddTagsToMurals < ActiveRecord::Migration[5.0]
  def change
    add_column :admin_murals, :tag, :string
    add_column :admin_murals, :category, :integer
  end
end
