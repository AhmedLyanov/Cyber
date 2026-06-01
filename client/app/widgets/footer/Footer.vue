<template>
  <footer
    class="flex justify-between px-40 py-24 bg-footer-bg text-footer-text"
  >
    <div class="max-w-95 flex flex-col gap-6">
      <Logo class="invert" />

      <Typography variant="bodySm">
        We are a residential interior design firm located in Portland.
        Our boutique-studio offers more than
      </Typography>

      <!-- social networks -->
    </div>

    <div class="grid grid-cols-2 gap-20">
      <div class="flex flex-col gap-4">
        <Typography variant="body" class="font-semibold text-white">
          Services
        </Typography>

        <Typography variant="footer">Bonus program</Typography>
        <Typography variant="footer">Gift cards</Typography>
        <Typography variant="footer">Credit and payment</Typography>
        <Typography variant="footer">Service contracts</Typography>
        <Typography variant="footer">Non-cash account</Typography>
        <Typography variant="footer">Payment</Typography>
      </div>

      <div class="flex flex-col gap-4">
        <Typography variant="body" class="font-semibold text-white">
            Assistance to the buyer        
        </Typography>

        <Typography variant="footer">Find an order</Typography>
        <Typography variant="footer">Terms of delivery</Typography>
        <Typography variant="footer">Exchange and return</Typography>
        <Typography variant="footer">Guarantee</Typography>
        <Typography variant="footer">Frequently asked questions</Typography>
        <Typography variant="footer">Terms of use of the site</Typography>
      </div>

    </div>
  </footer>
</template>
<script setup>
import { Logo, Input } from '~/shared/ui';
</script>