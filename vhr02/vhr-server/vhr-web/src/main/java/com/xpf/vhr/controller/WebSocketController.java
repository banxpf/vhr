package com.xpf.vhr.controller;

import com.xpf.vhr.model.ChatMsg;
import com.xpf.vhr.model.Hr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
public class WebSocketController {
	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/ws/chat")
	public void handleMsg(Authentication authentication, ChatMsg chatMsg) {
		Hr hr = (Hr) authentication.getPrincipal();
		chatMsg.setFrom(hr.getUsername());
		chatMsg.setFromNickname(hr.getName());
		chatMsg.setDate(new Date());
		System.out.println(chatMsg);
		simpMessagingTemplate.convertAndSendToUser(chatMsg.getTo(),"/queue/chat", chatMsg);

	}
}
