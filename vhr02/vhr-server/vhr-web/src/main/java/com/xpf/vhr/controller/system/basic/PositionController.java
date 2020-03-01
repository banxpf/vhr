package com.xpf.vhr.controller.system.basic;

import com.xpf.vhr.model.Position;
import com.xpf.vhr.model.RespBean;
import com.xpf.vhr.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system/basic")
public class PositionController {
	@Autowired
	PositionService positionService;
	@GetMapping("/pos")
	public List<Position> getAllPositions() {
		return positionService.getAllPositions();
	}
	@PostMapping("/pos")
	public RespBean addPosition(@RequestBody Position position) {
		if (positionService.addPosition(position) == 1) {
			return RespBean.ok("添加成功!");
		}
		return RespBean.error("添加失败!");
	}

	@PutMapping("/pos")
	public RespBean updatePosition(@RequestBody Position position) {
		if (positionService.updatePosition(position) == 1) {
			return RespBean.ok("修改成功！");
		}
		return RespBean.error("修改失败！");
	}

	@DeleteMapping("/pos/{id}")
	public RespBean deletePositionById(@PathVariable Integer id) {
		if (positionService.deletePositionById(id) == 1) {
			return RespBean.ok("删除成功！");
		}
		return RespBean.error("删除失败！");
	}
	@DeleteMapping("/pos/many")
	public RespBean deletePositionById(Integer[] ids) {
		if (positionService.deletePositionsByIds(ids) == ids.length) {
			return RespBean.ok("删除成功！");
		}
		return RespBean.error("删除失败！");
	}
}
