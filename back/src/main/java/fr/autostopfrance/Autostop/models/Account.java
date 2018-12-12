package fr.autostopfrance.Autostop.models;

import org.hibernate.annotations.Cascade;

import javax.persistence.*;

@Entity
@Table(name="account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_account")
    private Long idAccount;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_user", referencedColumnName="id_user")
    private User idUser;

    protected Account () {}

    public Account (String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return idAccount;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
