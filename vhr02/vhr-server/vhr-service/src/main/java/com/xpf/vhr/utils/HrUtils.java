package com.xpf.vhr.utils;

import com.xpf.vhr.model.Hr;
import org.springframework.security.core.context.SecurityContextHolder;

public class HrUtils {
	public static Hr getCurrentHr() {
		return ((Hr) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
	}

}
