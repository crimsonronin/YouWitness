<?php

namespace YouWitness\Entity;

use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class Participant {

    /**
     * @ORM\Id 
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=150, nullable=true) 
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=6, nullable=true) 
     */
    private $gender;
    
    /**
     * @ORM\Column(type="datetime") 
     */
    private $date;
    
    public function __construct() {
        $this->date = new \DateTime("now");
    }

    public function __get($key) {
        return $this->$key;
    }

    public function __set($key, $value) {
        $this->$key = $value;
    }

}