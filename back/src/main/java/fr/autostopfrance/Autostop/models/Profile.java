package fr.autostopfrance.Autostop.models;

import javax.persistence.Entity;
import java.util.ArrayList;

abstract class Profile {

    protected ArrayList<Evaluation> evaluation;

    protected Profile(){
        this.evaluation = new ArrayList<Evaluation>();
    }

    public ArrayList<Evaluation> getEvaluation() {
        return evaluation;
    }

    public void setEvaluation(ArrayList<Evaluation> evaluation) {
        this.evaluation = evaluation;
    }

    protected float calcRating(){
        return 0;
    }


}
