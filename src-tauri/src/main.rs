// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use src_modules::module1;
use std::env;
use dotenv::dotenv;



fn main() {

    dotenv().ok();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![module1::module_query_backend::simpleQuery]) 
        .setup(|app| {
            
            let app_handle = app.handle(); 
            module1::module_query_backend::start_sending_data2(app_handle.clone());
            
            Ok(())

        })
        .run(tauri::generate_context!())
        .expect("Ошибка при запуске приложения Tauri");

}
