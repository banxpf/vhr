package com.xpf.vhr.controller;

import com.xpf.vhr.model.RespBean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

	@GetMapping("/login")
	public RespBean login() {
		return RespBean.error("你还没有登录,请登录！");
	}
}
