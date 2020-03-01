package com.xpf.mailserver.receiver;

import com.xpf.vhr.model.Employee;
import com.xpf.vhr.model.Hr;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Date;

@Component
public class MailReceiver {

	public static final Logger LOGGER = LoggerFactory.getLogger(MailReceiver.class);
	@Autowired
	JavaMailSender javaMailSender;
	@Autowired
	MailProperties mailProperties;
	@Autowired
	TemplateEngine templateEngine;
	@RabbitListener(queues = "xpf.mail")
	public void handler(Employee employee) {
		MimeMessage msg = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(msg);
		try {
			helper.setFrom(mailProperties.getUsername());
			helper.setTo(employee.getEmail());
			helper.setSubject("入职欢迎");
			helper.setSentDate(new Date());

			Context context = new Context();
			context.setVariable("name",employee.getName());
			context.setVariable("posName",employee.getPosition().getName());
			context.setVariable("joblevelName",employee.getJobLevel().getName());
			context.setVariable("departmentName",employee.getDepartment().getName());
			String mail = templateEngine
					.process("mail", context);
			helper.setText(mail, true);
			javaMailSender.send(msg);
		} catch (MessagingException e) {
			e.printStackTrace();
			LOGGER.error("邮件发送失败:"+e.getMessage());
		}
	}
}
