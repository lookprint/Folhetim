class AddEditalToMurals < ActiveRecord::Migration[5.0]
   def up
    add_attachment :admin_murals, :edital
  end

  def down
    remove_attachment :admin_murals, :edital
  end
end
