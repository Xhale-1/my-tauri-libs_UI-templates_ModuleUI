// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]



use oracle::Connection;

#[tauri::command]
fn dsaemdbquery(query: &str) -> String {

    let username = "E3_ADMIN";
    let password = "ddbadmine3";
    let connect_string = "pme3app1:1521/E3P2";

    // Подключаемся к базе
    let conn = match Connection::connect(username, password, connect_string) {
        Ok(c) => c,
        Err(e) => return format!("Connection failed: {}", e),
    };

    // Выполняем запрос
    match conn.query_row(query, &[]) {
        Ok(row) => row.get(0).unwrap_or_else(|_| "No data".to_string()),
        Err(e) => format!("Query failed: {}", e),
    }
}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![dsaemdbquery]) 
        .setup(|app| {
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Ошибка при запуске приложения Tauri");

}
