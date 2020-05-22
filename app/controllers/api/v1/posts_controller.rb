require "open3"
require "tempfile"
module Api
  module V1
    class PostsController < ApplicationController
      skip_before_action :verify_authenticity_token
      def create
        output = ""
        err = ""
        status = ""
        path = ""
        Tempfile.create(["ruby_", ".rb"]) do |f|
          f.puts params[:code]
          path = f.path
          f.gets
          # 5秒でTimeout、Timeout後2秒で強制kill
          output, err, status = Open3.capture3("timeout -k 2s 5s ruby #{f.path}")
        end

        if err.present?
          output = err.gsub(path, "ruby.rb")
        end

        if status.exitstatus == 124
          output = "Timeoutしました。"
        end
        if status.exitstatus == 125
          output = "Timeoutが失敗しました。"
        end

        render json: { status_code: status.exitstatus, output: output }
      end
    end
  end
end
