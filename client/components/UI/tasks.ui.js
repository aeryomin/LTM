import COMMON_PROPS from './common'

const tasksUI = {
  active: {
    // bgColor: 'bg-green-200',
    bgColor: COMMON_PROPS.task.bgColor,
    bgOpacity: COMMON_PROPS.task.bgOpacity,
    borderColor: 'border-green-400',
    title: {
      bgColor: 'bg-gray-100',
      fontSize: 'text-base',
      fontColor: 'text-gray-200',
      fontTransform: 'normal-case'
    },
    button: {
      active: {
        bgColor: COMMON_PROPS.task.button.active.bgColor,
        fontColor: COMMON_PROPS.task.button.active.fontColor,
        fontSize: COMMON_PROPS.task.button.active.fontSize
      },
      hover: {
        bgColor: COMMON_PROPS.task.button.hover.bgColor,
        fontColor: COMMON_PROPS.task.button.hover.fontColor,
        fontSize: COMMON_PROPS.task.button.active.fontSize
      }
    },
    executor: {
      bgColor: 'bg-gray-100',
      fontSize: COMMON_PROPS.task.executor.fontSize,
      fontColor: COMMON_PROPS.task.executor.fontColor,
      fontTransform: 'normal-case'
    },
    content: {
      bgColor: 'bg-gray-100',
      fontSize: COMMON_PROPS.task.content.fontSize,
      fontColor: 'text-gray-200',
      fontTransform: 'normal-case',
      borderColor: 'border-gray-500'
    },
    Expire: {
      expired: {
        fontSize: COMMON_PROPS.task.Expire.expired.fontSize,
        fontColor: COMMON_PROPS.task.Expire.expired.fontColor
      },
      notExpired: {
        fontSize: COMMON_PROPS.task.Expire.notExpired.fontSize,
        fontColor: COMMON_PROPS.task.Expire.notExpired.fontColor
      }
    },
    status: {
      bgColor: 'bg-gray-100',
      fontSize: 'text-base',
      fontColor: 'text-green-500',
      fontTransform: COMMON_PROPS.task.status.fontTransform
    },
    info: {
      bgColor: 'bg-gray-100',
      fontSize: COMMON_PROPS.task.info.fontSize,
      fontColor: COMMON_PROPS.task.info.fontColor,
      fontTransform: 'normal-case'
    }
  },
  new: {
    // bgColor: 'bg-red-400',
    bgColor: COMMON_PROPS.task.bgColor,
    bgOpacity: COMMON_PROPS.task.bgOpacity,
    borderColor: 'border-red-700',
    title: {
      bgColor: 'bg-gray-100',
      fontSize: 'text-base',
      fontColor: 'text-gray-200',
      fontTransform: 'normal-case'
    },
    button: {
      active: {
        bgColor: COMMON_PROPS.task.button.active.bgColor,
        fontColor: COMMON_PROPS.task.button.active.fontColor,
        fontSize: COMMON_PROPS.task.button.active.fontSize
      },
      hover: {
        bgColor: COMMON_PROPS.task.button.hover.bgColor,
        fontColor: COMMON_PROPS.task.button.hover.fontColor,
        fontSize: COMMON_PROPS.task.button.active.fontSize
      }
    },
    executor: {
      bgColor: 'bg-gray-100',
      fontSize: COMMON_PROPS.task.executor.fontSize,
      fontColor: COMMON_PROPS.task.executor.fontColor,
      fontTransform: 'normal-case'
    },
    content: {
      bgColor: 'bg-gray-100',
      fontSize: COMMON_PROPS.task.content.fontSize,
      fontColor: 'text-gray-200',
      fontTransform: 'normal-case',
      borderColor: 'border-gray-400'
    },
    Expire: {
      expired: {
        fontSize: COMMON_PROPS.task.Expire.expired.fontSize,
        fontColor: COMMON_PROPS.task.Expire.expired.fontColor
      },
      notExpired: {
        fontSize: COMMON_PROPS.task.Expire.notExpired.fontSize,
        fontColor: COMMON_PROPS.task.Expire.notExpired.fontColor
      }
    },
    status: {
      bgColor: 'bg-gray-100',
      fontSize: 'text-base',
      fontColor: 'text-red-700',
      fontTransform: COMMON_PROPS.task.status.fontTransform
    },
    info: {
      bgColor: 'bg-gray-100',
      fontSize: COMMON_PROPS.task.info.fontSize,
      fontColor: COMMON_PROPS.task.info.fontColor,
      fontTransform: 'normal-case'
    }
  },
  done: {
    // bgColor: 'bg-gray-300',
    bgColor: COMMON_PROPS.task.bgColor,
    bgOpacity: COMMON_PROPS.task.bgOpacity,
    borderColor: 'border-gray-400',
    title: {
      bgColor: 'bg-gray-100',
      fontSize: 'text-base',
      fontColor: 'text-gray-200',
      fontTransform: 'normal-case'
    },
    button: {
      active: {
        bgColor: COMMON_PROPS.task.button.active.bgColor,
        fontColor: COMMON_PROPS.task.button.active.fontColor,
        fontSize: COMMON_PROPS.task.button.active.fontSize
      },
      hover: {
        bgColor: COMMON_PROPS.task.button.hover.bgColor,
        fontColor: COMMON_PROPS.task.button.hover.fontColor,
        fontSize: COMMON_PROPS.task.button.active.fontSize
      }
    },
    executor: {
      bgColor: 'bg-gray-100',
      fontSize: COMMON_PROPS.task.executor.fontSize,
      fontColor: COMMON_PROPS.task.executor.fontColor,
      fontTransform: 'normal-case'
    },
    content: {
      bgColor: 'bg-gray-100',
      fontSize: COMMON_PROPS.task.content.fontSize,
      fontColor: 'text-gray-200',
      fontTransform: 'normal-case',
      borderColor: 'border-gray-500'
    },
    Expire: {
      expired: {
        fontSize: COMMON_PROPS.task.Expire.expired.fontSize,
        fontColor: COMMON_PROPS.task.Expire.expired.fontColor
      },
      notExpired: {
        fontSize: COMMON_PROPS.task.Expire.notExpired.fontSize,
        fontColor: COMMON_PROPS.task.Expire.notExpired.fontColor
      }
    },
    status: {
      bgColor: 'bg-gray-100',
      fontSize: 'text-base',
      fontColor: 'text-gray-500',
      fontTransform: COMMON_PROPS.task.status.fontTransform
    },
    info: {
      bgColor: 'bg-gray-100',
      fontSize: COMMON_PROPS.task.info.fontSize,
      fontColor: COMMON_PROPS.task.info.fontColor,
      fontTransform: 'normal-case'
    }
  },
  hold: {
    // bgColor: 'bg-blue-200',
    bgColor: COMMON_PROPS.task.bgColor,
    bgOpacity: COMMON_PROPS.task.bgOpacity,
    borderColor: 'border-blue-400',
    title: {
      bgColor: 'white',
      fontSize: 'text-base',
      fontColor: 'text-gray-200',
      fontTransform: 'normal-case'
    },
    button: {
      active: {
        bgColor: COMMON_PROPS.task.button.active.bgColor,
        fontColor: COMMON_PROPS.task.button.active.fontColor,
        fontSize: COMMON_PROPS.task.button.active.fontSize
      },
      hover: {
        bgColor: COMMON_PROPS.task.button.hover.bgColor,
        fontColor: COMMON_PROPS.task.button.hover.fontColor,
        fontSize: COMMON_PROPS.task.button.active.fontSize
      }
    },
    executor: {
      bgColor: 'bg-gray-100',
      fontSize: COMMON_PROPS.task.executor.fontSize,
      fontColor: COMMON_PROPS.task.executor.fontColor,
      fontTransform: 'normal-case'
    },
    content: {
      bgColor: 'bg-gray-100',
      fontSize: COMMON_PROPS.task.content.fontSize,
      fontColor: 'text-gray-200',
      fontTransform: 'normal-case',
      borderColor: 'border-gray-300'
    },
    Expire: {
      expired: {
        fontSize: COMMON_PROPS.task.Expire.expired.fontSize,
        fontColor: COMMON_PROPS.task.Expire.expired.fontColor
      },
      notExpired: {
        fontSize: COMMON_PROPS.task.Expire.notExpired.fontSize,
        fontColor: COMMON_PROPS.task.Expire.notExpired.fontColor
      }
    },
    status: {
      bgColor: 'bg-blue-100',
      fontSize: 'text-base',
      fontColor: 'text-blue-500',
      fontTransform: COMMON_PROPS.task.status.fontTransform
    },
    info: {
      bgColor: 'bg-gray-100',
      fontSize: COMMON_PROPS.task.info.fontSize,
      fontColor: COMMON_PROPS.task.info.fontColor,
      fontTransform: 'normal-case'
    }
  }
}

export default tasksUI
