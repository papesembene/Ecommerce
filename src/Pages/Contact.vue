<script setup>
import Header from "../components/Header.vue";
</script>

<template>
   
    <section id="contact-area" data-scroll-index="6">
        <div class="container">
            <div class="row">
                <!--start section heading-->
                <div class="col-lg-6 col-md-8">
                    <div class="section-heading">
                        <h2>Contactez-nous</h2>
                        <p>Nous sommes là pour vous aider ! Si vous avez des questions, des commentaires ou des préoccupations, n'hésitez pas à nous contacter. Nous serons ravis de vous répondre dans les plus brefs délais.</p>
                    </div>
                </div>
                <!--end section heading-->
            </div>
            <div class="row">
                <!--start contact form-->
                <div class="col-md-7">
                    <div class="contact-form">
                        <form id="ajax-contact" action="contact.php" method="post">
                            <div class="form-group">
                                <input type="text" class="form-control" id="name" name="name" placeholder="Name*" required="required" data-error="name is required.">
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control" id="email" name="email" placeholder="Email*" required="required" data-error="valid email is required.">
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="form-group">
                                <textarea class="form-control" id="message" name="message" rows="10" placeholder="Write Your Message*" required="required" data-error="Please, leave us a message."></textarea>
                                <div class="help-block with-errors"></div>
                            </div>
                            <button type="submit">Submit</button>
                            <div class="messages"></div>
                        </form>
                    </div>
                </div>
                <!--end contact form-->
                <!--start contact image-->
                <div class="col-md-5">
                    <div class="contact-img text-center">
                        <img src="/images/watch-10.png" class="img-fluid animation-jump" alt>
                    </div>
                </div>
                <!--end contact image-->
            </div>
        </div>
    </section>
</template>