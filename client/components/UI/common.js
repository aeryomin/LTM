const COMMON_PROPS = {
  tasklist: {
    overflowYScroll: 'overflow-y-scroll'
  },
  task: {
    bgColor: 'bg-gray-800',
    bgOpacity: 'bg-opacity-75',
    executor: {
      fontSize: 'text-xs',
      fontColor: 'text-gray-200'
    },
    button: {
      active: {
        // bgColor: 'bg-blue-300',
        bgColor: '',
        fontColor: 'text-white',
        fontSize: 'text-xs'
      },
      hover: {
        // bgColor: 'hover:bg-blue-500',
        bgColor: 'hover:bg-gray-500',
        fontColor: 'hover:text-white',
        fontSize: 'text-xs'
      }
    },
    content: {
      fontSize: 'text-sm'
    },
    status: {
      fontTransform: 'uppercase'
    },
    info: {
      fontSize: 'text-xs',
      fontColor: 'text-gray-400'
    },
    Expire: {
      expired: {
        fontSize: 'text-xs',
        fontColor: 'text-red-500'
      },
      notExpired: {
        fontSize: 'text-xs',
        fontColor: 'text-gray-200'
      }
    }
  }
}

export default COMMON_PROPS
