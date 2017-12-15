package com.university.diploma.controller;

import com.university.diploma.model.Params;
import com.university.diploma.service.CalculationService;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

@RestController
@RequestMapping("/")
public class MapController {

    @Autowired
    CalculationService calculationService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView mapView() {
        ModelAndView modelAndView = new ModelAndView("index");
        return modelAndView;
    }

    @RequestMapping(value = "/waveCalculation", method = RequestMethod.POST)
    private String waveCalculation(@RequestBody Params params) throws IOException {
        System.out.println("params " + params);
        Map<Double, Double> map = calculationService.calculateProblem(params.getElevation(), params.getElevationMax(),
                params.getFrequency(), params.getMode());
        System.out.println("map" + map);
        String json = new ObjectMapper().writeValueAsString(map);
        return json;
    }
}
