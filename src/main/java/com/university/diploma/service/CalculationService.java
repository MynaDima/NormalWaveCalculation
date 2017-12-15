package com.university.diploma.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import static java.lang.Math.cos;
import static java.lang.Math.round;

@Service
public class CalculationService {

    public Map<Double, Double> calculateProblem(String elev, String elevMax, String frequency, String mode) {
        System.out.println("Eval " + elev + frequency);
        elev = elev.replace("-", "");
        Double elevation = Double.parseDouble(elev);
        Double elevationMax = Double.parseDouble(elevMax);
        Double frequencyValue = Double.parseDouble(frequency);
        Map<Double, Double> ksiMap = new TreeMap<>();
        Double k = (2 * Math.PI)/ frequencyValue;
        double funk = 0.0;

        for (double z = 0; z <= 100; z++) {
            double l = 1;
            Double A = 0.0;
            for (int i = 1; i <= 3; i++) {
                funk += Math.sin(k * Math.sqrt(1 - Math.pow(i * Math.PI / (elevationMax * k), 2)) * z) * cos((i * Math.PI * elevation) / elevationMax);
                ksiMap.put(z, Math.abs(funk));
            }
        }
        return ksiMap;
    }

    public Map<Double, Double> calculateProblemCoordinateZ(String elev, String frequency, String mode, String z) {
        System.out.println("Eval " + elev + frequency);
        elev = elev.replace("-", "");
        Double elevation = Double.parseDouble(elev);

        Double frequencyValue = Double.parseDouble(frequency);
        Double zValue = Double.parseDouble(z);
        Map<Double, Double> ksiMap = new TreeMap<>();
        double funk = 0;
        Double A = null;
        for (int i = 0; i <= 3; i++) {
            funk += 0.5 * roundResult(Math.sqrt(1 - Math.pow(1500 * i * Math.PI / (elevation * frequencyValue), 2)), 4);
            A += Math.cos(((Math.PI * i) / elevation) * zValue * frequencyValue);
        }
        System.out.println("funk " + funk);

        double re = A * Math.cos(funk * zValue);
        double im = A * Math.sin(funk * zValue);
        System.out.println("re " + re);
        System.out.println("im " + im);
        rezZxCalculation(ksiMap, zValue, re, im);
        return ksiMap;
    }

    private void rezZxCalculation(Map<Double, Double> ksiMap, double z, double re, double im) {
        double resZx = Math.sqrt(Math.pow(re, 2) + Math.pow(im, 2));
        System.out.println("resZx " + resZx);
        System.out.println("z" + z);
        ksiMap.put(z, resZx);
    }

    double roundResult(double d, int precise) {
        precise = 10 ^ precise;
        d = d * precise;
        int i = (int) Math.round(d);
        return (double) i / precise;
    }
}
