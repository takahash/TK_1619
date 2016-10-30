class ChangeDatatypeEndTimeOfLogs < ActiveRecord::Migration[5.0]
  def change
    change_column :logs, :end_time, :datetime
  end
end
