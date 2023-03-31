#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{Window, Manager};
use arboard::Clipboard;
use clipboard_master::{Master, ClipboardHandler, CallbackResult};
use std::io;
use tauri_plugin_positioner::{WindowExt, Position};


struct Handler {
  window: Window,
}

impl ClipboardHandler for Handler {
    fn on_clipboard_change(&mut self) -> CallbackResult {
        let mut clipboard = Clipboard::new().unwrap();

        match clipboard.get_text() {
          Ok(value) => self.window.emit("clip-board", value).unwrap(),
          Err(_) => (),
        }

        CallbackResult::Next
    }

    fn on_clipboard_error(&mut self, error: io::Error) -> CallbackResult {
        eprintln!("Error: {}", error);
        CallbackResult::Next
    }
}


fn init_clip_manager(window: Window) {
  let mut clip_lsnr = Master::new(Handler { window: window });
  clip_lsnr.run().unwrap();
  
}

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_positioner::init())
    .setup(|app| {
      let main_window = app.get_window("main").unwrap();
      let main_window_2 = app.get_window("main").unwrap();

      let _ = main_window.move_window(Position::TopCenter);

      std::thread::spawn(move || {
        init_clip_manager(main_window_2);
      });

      Ok(())
    })
    .invoke_handler(tauri::generate_handler![])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");


}
