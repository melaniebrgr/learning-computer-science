(module
  (func $print (import "js" "print") (param i32))
  (func (export "addTwo") (param i32 i32)
    local.get 0
    local.get 1
    i32.add
    call $print))