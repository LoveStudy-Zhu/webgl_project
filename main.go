package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.Handle("/test/", http.StripPrefix("/test/", http.FileServer(http.Dir("./test"))))
	http.Handle("/study_webgl/", http.StripPrefix("/study_webgl/", http.FileServer(http.Dir("./study_webgl"))))
	http.Handle("/video/", http.StripPrefix("/video/", http.FileServer(http.Dir("./video"))))
	http.Handle("/jmp/", http.StripPrefix("/jmp/", http.FileServer(http.Dir("./jmp"))))
	http.Handle("/test_round/", http.StripPrefix("/test_round/", http.FileServer(http.Dir("./ThreeJSPanorama"))))
	http.Handle("/test_model/", http.StripPrefix("/test_model/", http.FileServer(http.Dir("./test_model"))))
	http.Handle("/test_ui/",http.StripPrefix("/test_ui/", http.FileServer(http.Dir("./test_ui"))))
	http.Handle("/test_webgl/", http.StripPrefix("/test_webgl/", http.FileServer(http.Dir("./test_webgl"))))
	err := http.ListenAndServe("0.0.0.0:10101",nil)
	if err!=nil{
		fmt.Println("出现错误",err)
	}
}