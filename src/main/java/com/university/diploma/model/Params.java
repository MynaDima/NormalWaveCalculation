package com.university.diploma.model;


public class Params {

    private String elevation;
    private String frequency;
    private String mode;
    private String elevationMax;


    public Params() {
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public String getElevation() {
        return elevation;
    }

    public void setElevation(String elevation) {
        this.elevation = elevation;
    }

    public String getElevationMax() {
        return elevationMax;
    }

    public void setElevationMax(String elevationMax) {
        this.elevationMax = elevationMax;
    }

    @Override
    public String toString() {
        return "Params{" +
                "elevation='" + elevation + '\'' +
                ", frequency='" + frequency + '\'' +
                ", mode='" + mode + '\'' +
                '}';
    }
}
