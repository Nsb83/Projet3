package fr.autostopfrance.Autostop.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Evaluation {

    private int rating;
    private String comment;

    public Evaluation() {}

    public Evaluation(int rating, String comment){
        this.rating = rating;
        this.comment = comment;
    }

    public Evaluation(int rating){
        this.rating = rating;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }


}
