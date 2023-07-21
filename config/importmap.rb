# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "preview", to: "preview.js"
pin "delete" , to: "delete.js"
pin "characters", to: "characters.js"
pin "message" , to: "message.js"
pin "radio-btn" , to: "radio-btn.js"
