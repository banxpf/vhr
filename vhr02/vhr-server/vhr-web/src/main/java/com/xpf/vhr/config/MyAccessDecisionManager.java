package com.xpf.vhr.config;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collection;
@Component
public class MyAccessDecisionManager implements AccessDecisionManager {
	@Override
	public void decide(Authentication authentication, Object o, Collection<ConfigAttribute> configAttributes) throws AccessDeniedException, InsufficientAuthenticationException {
//		System.out.println("需要的权限->"+configAttributes);
//		System.out.println("用户有的权限->"+authentication.getAuthorities());
		for (ConfigAttribute configAttribute : configAttributes) {
			String needRole = configAttribute.getAttribute();
//			System.out.println(needRole);
			if ("ROLE_LOGIN".equals(needRole)) {
				System.out.println("未执行");
				if (authentication instanceof AnonymousAuthenticationToken) {
					throw new AccessDeniedException("尚未登录，请登录！");
				} else {
					return;
				}
			}
			Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
			for (GrantedAuthority authority : authorities) {
				if (authority.getAuthority().equals(needRole)) {
//					System.out.println("执行了"+needRole);
					return;
				}
			}

		}
		throw new AccessDeniedException("权限不足，请联系管理员！");
	}

	@Override
	public boolean supports(ConfigAttribute configAttribute) {
		return true;
	}

	@Override
	public boolean supports(Class<?> aClass) {
		return true;
	}
}
