class AddSubjectToMurals < ActiveRecord::Migration[5.0]
  def change
    add_column :admin_murals, :subject, :string
  #  add_column :murals, :subject, :string
  end
end
