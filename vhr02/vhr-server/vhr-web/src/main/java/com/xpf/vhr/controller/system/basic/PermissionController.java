package com.xpf.vhr.controller.system.basic;

import com.xpf.vhr.model.Menu;
import com.xpf.vhr.model.RespBean;
import com.xpf.vhr.model.Role;
import com.xpf.vhr.service.MenuService;
import com.xpf.vhr.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system/basic")
public class PermissionController {

	@Autowired
	RoleService roleService;
	@Autowired
	MenuService menuService;
	@GetMapping("/permission")
	public List<Role> getAllRoles() {
		return roleService.getAllRoles();
	}
	@GetMapping("/permission/menu")
	public List<Menu> getAllMenus() {
		return menuService.getAllMenus();
	}
	@GetMapping("/permission/mid/{rid}")
	public List<Integer> getMidsByRid (@PathVariable Integer rid) {
		return menuService.getMidsByRid(rid);
	}
	@PutMapping("/permission")
	public RespBean updateMenuRole(Integer rid, Integer [] mids) {
		if (menuService.updateMenuRole(rid,mids)) {
			return RespBean.ok("更新成功");
		}
		return RespBean.error("更新失败");
	}
	@PostMapping("/permission/role")
	public RespBean addRole(@RequestBody Role role) {
		if (roleService.addRole(role) == 1) {
			return RespBean.ok("更新成功");
		}
		return RespBean.error("更新失败");
	}
	@DeleteMapping("/permission/role/{rid}")
	public RespBean deleteRoleById(@PathVariable Integer rid) {
		if (roleService.deleteRoleById(rid) == 1) {
			return RespBean.ok("删除成功");
		}
		return RespBean.error("删除失败");
	}
}
