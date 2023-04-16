<script lang="ts">
	import { ToastType, toast } from '$lib/store/toast.store'

    const toastColors = {
        [ToastType.ERROR]: 'bg-red',
        [ToastType.WARNING]: 'bg-yellow',
        [ToastType.SUCCESS]: 'bg-green',
        [ToastType.MESSAGE]: 'bg-primary-solid',
    }
</script>

{ #if $toast.type }
    <div class="p-16 absolute z-10 rounded-xl text-white max-w-400 m-auto left-0 right-0 text-center text-16 font-600 top-24 { toastColors[$toast.type] }">
        { $toast.message }
    </div>
{ /if }
