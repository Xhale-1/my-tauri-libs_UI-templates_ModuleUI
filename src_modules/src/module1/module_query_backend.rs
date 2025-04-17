

use oracle::{Connection, ResultSet, Row};
use tauri::{AppHandle, Emitter, Listener, Manager};
use std::thread;
use tokio::time::Duration;
use std::collections::HashMap;
use serde::{Serialize, Deserialize};
use serde_json::Value;

use std::env;
use dotenv::dotenv;

#[tauri::command]
pub fn simpleQuery(query: &str) -> String {

    let username_owned: String = env::var("username_DB").expect("name is not set");
    let username = username_owned.as_str();

    let password: String = env::var("password_DB").expect("name is not set");
    let password = password.as_str();

    let connect_string: String = env::var("connect_string_DB").expect("name is not set");
    let connect_string = connect_string.as_str();

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




#[derive(Serialize, Deserialize)]
pub struct DbResult0 {
    pub success: bool,
    pub message: String,
    pub data: Option<Value>,
}

impl DbResult0 {
    pub fn success<T: Serialize>(data: Option<T>) -> Self {
        Self {
            success: true,
            message: "Запрос выполнен успешно".to_string(),
            data: data.map(|d| serde_json::to_value(d).unwrap()),
        }
    }

    pub fn error(message: String) -> Self {
        Self {
            success: false,
            message,
            data: None,
        }
    }
}

pub fn make_dsaem_db_query(query: &str) -> Result<ResultSet<'static, Row>, String> {

    let username_owned: String = env::var("username_DB").expect("name is not set");
    let username = username_owned.as_str();

    let password: String = env::var("password_DB").expect("name is not set");
    let password = password.as_str();

    let connect_string: String = env::var("connect_string_DB").expect("name is not set");
    let connect_string = connect_string.as_str();

    // Пытаемся подключиться к БД
    let conn = match Connection::connect(username, password, connect_string) {
        Ok(conn) => conn,
        Err(e) => return Err(format!("Ошибка подключения к базе данных: {}", e)),
    };

    // Выполняем запрос
    let rows = match conn.query(query, &[]) {
        Ok(rows) => rows,
        Err(e) => return Err(format!("Ошибка выполнения запроса: {}", e)),
    };

    Ok(rows)
}

pub fn extract_query_data_hash(response: Result<ResultSet<'static, Row>, String>) -> Vec<HashMap<String, String>> {
    // First handle the outer Result
    let rows = match response {
        Ok(rows) => rows,
        Err(e) => {
            eprintln!("Error in query result: {}", e);
            return Vec::new(); // Return empty vector on error
        }
    };

    // Now process the rows
    let mut data = Vec::new();
    for row_result in rows {
        let row = match row_result {
            Ok(row) => row,
            Err(e) => {
                eprintln!("Ошибка обработки строки: {}", e);
                continue;
            }
        };

        let mut row_data = HashMap::new();
        for (i, info) in row.column_info().iter().enumerate() {
            let column_name = info.name().to_string();
            let value: String = row.get(i).unwrap_or_default();
            row_data.insert(column_name, value);
        }
        data.push(row_data);
    }

    data 
}

pub fn dsaemdbquerry0(query: &str) -> DbResult0 {
    let response = make_dsaem_db_query(query);
    let data = extract_query_data_hash(response);

    if data.is_empty() {
        DbResult0::success::<Vec<HashMap<String, String>>>(None)
    } else {
        DbResult0::success(Some(data))
    }
}

pub fn start_sending_data2(app_handle: AppHandle) {
    thread::spawn(move || {
        loop {

            let dev = dsaemdbquerry0("SELECT COUNT(*) FROM E3_ADMIN.\"ComponentData\" ");
            let dev_json =  serde_json::to_string_pretty(&dev).unwrap();
            app_handle.emit("dev", dev_json).unwrap();
            //println!("{}", json);

            let sym = dsaemdbquerry0("SELECT COUNT(*) FROM E3_ADMIN.\"SymbolData\" ");
            let sym_json =  serde_json::to_string_pretty(&sym).unwrap();
            app_handle.emit("sym", sym_json).unwrap();
            //println!("{}", json);




            thread::sleep(Duration::from_secs(4));
        }
    });
}



