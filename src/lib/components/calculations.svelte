<script lang="ts">
    export let meta
</script>

<h1 class="text-2xl font-bold leading-normal bg-blue-400 text-white px-10 py-3">
    Calculated Results
</h1>
<ul class="px-10 py-4">
    <li class="pt-3 mb-3 sm:grid sm:grid-cols-2 sm:gap-4">
        <span class="text-sm font-medium text-gray-500 flex self-center">Length of supply chain</span>
        <span class="mt-1 text-sm text-gray-900 sm:mt-0">{meta.supplyChainLength.toLocaleString()} km</span>
    </li>
    <li class="pt-3 mb-3 sm:grid sm:grid-cols-2 sm:gap-4">
        <span class="text-sm font-medium text-gray-500 flex self-center">Amount of packaging per year</span>
        <span class="mt-1 text-sm text-gray-900 sm:mt-0">{meta.annualPackagingWeight / 1000000} tonnes</span>
    </li>
    <li class="pt-3 mb-3 sm:grid sm:grid-cols-2 sm:gap-4">
        <span class="text-sm font-medium text-gray-500 flex self-center">Pieces of packaging per year</span>
        <span class="mt-1 text-sm text-gray-900 sm:mt-0">{meta.annualPackagingPieces.toLocaleString()}</span>
    </li>
    <li class="pt-3 mb-3 sm:grid sm:grid-cols-2 sm:gap-4">
        <span class="text-sm font-medium text-gray-500 flex self-center">Total weight transported</span>
        <span class="mt-1 text-sm text-gray-900 sm:mt-0">{((meta.annualPackagingWeight / 1000000) * meta.supplyChainLength).toLocaleString()} tonne-kms</span>
    </li>
</ul>