package com.university.diploma.controller;

import com.university.diploma.service.CalculationService;
import org.apache.commons.io.IOUtils;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/points")
public class FunctionContorller {

    @Autowired
    CalculationService calculationService;

    String ELEVATION_API_URL = "https://maps.googleapis.com/maps/api/elevation/json";


    @RequestMapping(value = "/calculate", method = RequestMethod.GET)
    private String waveCalculation(@RequestParam("frequency") String frequency,
                                   @RequestParam("x") String x,
                                   @RequestParam("y") String y) throws IOException {
        System.out.println("frequency " + frequency);
        System.out.println("x " + x);
        System.out.println("y " + y);
        String elevation = getElevation(x, y);
        Map<Double, Double> map = calculationService.calculateProblem(elevation, elevation, frequency, "1");
        System.out.println("map" + map);
        String json = new ObjectMapper().writeValueAsString(map);
        return json;
    }


    @RequestMapping(value = "/calculateZ", method = RequestMethod.GET)
    private String zCalculation(@RequestParam("frequency") String frequency,
                                @RequestParam("x") String x,
                                @RequestParam("y") String y,
                                @RequestParam("z") String z) throws IOException {
        System.out.println("frequency " + frequency);
        System.out.println("x " + x);
        System.out.println("y " + y);
        System.out.println("z " + z);
        String elevation = getElevation(x,y);
        Map<Double, Double> map = calculationService.calculateProblemCoordinateZ(z, frequency, "1", z);
        System.out.println("map" + map);
        String json = new ObjectMapper().writeValueAsString(map);
        return json;
    }


    private String getElevation(String lat, String lng) throws IOException {

        String USER_AGENT = "Mozilla/5.0";

        String urlParameters = "locations=" + lat + "," + lng + "&sensor=true&key=AIzaSyD0STQBkTqhfX0sv1By1wW-Rz7wtly_2xQ";
        System.out.println(urlParameters);

        URL obj = new URL(ELEVATION_API_URL + "?" + urlParameters);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        //add reuqest header
        con.setRequestMethod("POST");
        con.setRequestProperty("User-Agent", USER_AGENT);
        con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        con.setRequestProperty("Content-Language", "en-US");

        //String urlParameters = request;

        // Send post request
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(urlParameters);
        wr.flush();
        wr.close();

        InputStream in = con.getInputStream();
        String encoding = con.getContentEncoding();
        encoding = encoding == null ? "UTF-8" : encoding;
        String body = IOUtils.toString(in, encoding);
        System.out.println(body);

        String elevation = null;

        JsonFactory factory = new JsonFactory();
        ObjectMapper mapper = new ObjectMapper(factory);
        JsonNode rootNode = mapper.readTree(body);
        Iterator<Map.Entry<String, JsonNode>> fieldsIterator = rootNode.getFields();
        while (fieldsIterator.hasNext()) {
            Map.Entry<String, JsonNode> field = fieldsIterator.next();
            System.out.println("Key: " + field.getKey() + "\tValue:" + field.getValue());
            List<JsonNode> elevations = field.getValue().findValues("elevation");
            System.out.println("elevation1 " + elevations);
            for (JsonNode jsonNode : elevations) {
                System.out.println("el " + jsonNode.getTextValue());
                elevation = jsonNode.getValueAsText();
            }
        }

        System.out.println("elevation " + elevation);
        return elevation;
    }

}
