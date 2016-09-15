class Admin::Mural < ApplicationRecord
#  belongs_to :department
  has_attached_file :edital, styles: {thumbnail: "60x60#"}
  validates_attachment :edital, content_type: { content_type: "application/pdf" }
 # validates_something_else # Other validations that conflict with Paperclip's

end
