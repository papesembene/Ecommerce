<script setup>
import Header from "../components/Header.vue";
</script>

<template>
    <section id="home-area" data-scroll-index="0">
        <div class="container">
            <div class="row">
                <!--start caption content-->
                <div class="col-md-6">
                    <div class="caption d-table">
                        <div class="d-table-cell align-middle">
                            <h1>Montre digitale intelligente pour une vie de luxe</h1>
                            <p>Le bandeau décoratif est juste à droite et le porteur est petit et doré. La dignité est fière et élégante</p>
                            <router-link to="/shop"> Acheter des produits</router-link>
                        </div>
                    </div>
                </div>
                <!--end caption content-->
                <!--start caption image-->
                <div class="col-md-6">
                    <div class="caption-img text-right">
                        <img src="/images/watch-7.png" class="img-fluid animation-jump" alt>
                    </div>
                </div>
                <!--end caption image-->
            </div>
        </div>
        <div class="pattern-bg"></div>
    </section>

</template>