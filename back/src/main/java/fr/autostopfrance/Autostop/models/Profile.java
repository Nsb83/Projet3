package fr.autostopfrance.Autostop.models;

import java.util.ArrayList;

abstract class Profile {
    protected ArrayList<Evaluation> evaluation;

    protected Profile(){
        this.evaluation = new ArrayList<Evaluation>();
    }

    protected ArrayList<Evaluation> getEvaluation() {
        return evaluation;
    }

    protected void setEvaluation(ArrayList<Evaluation> evaluation) {
        this.evaluation = evaluation;
    }

    protected float calcRating(){
        return 0;
    }

}
