import { NButton, NPopconfirm, NSpace, useMessage, useModal } from "naive-ui"
import { defineComponent, onMounted, ref } from "vue"
import { getList, getListByPage, http } from "@/api"

import EditForm from "../components/common/EditForm.vue"

export default defineComponent({
  props: {
    form: {
      type: Object,
      default: {}
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    isPageQuery: {
      type: Boolean,
      default: true,
    },
    hasAction: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: [] as any[]
    },
    getUrl: {
      type: String,
      default: ''
    },
    deleteUrl: {
      type: String,
      default: ''
    },
    
  },
  setup(props) {
    const modal = useModal()
    const message = useMessage()

    const pagination = ref({
      defaultPage: 1,
      pageCount: 1,
      pageSize: 20,
    })

    const basicColumns = [
      {
        type: 'selection',
      },
      {
        title: '操作',
        key: 'actions',
        render(row) {
          return (
            <NSpace justify="center">
              {props.form?.actionCfg?.button?.map((i) => (
                <NButton
                  type="warning"
                  size="small"
                  onClick={() => {
                    modal.create({
                      title: i.title || '编辑',
                      transformOrigin: 'center',
                      content: () => {
                        return i?.showComponent
                          ? i?.showComponent(row, async () => {
                              await getData()
                              modal.destroyAll()
                            })
                          : <EditForm
                              type={i.type}
                              form={i}
                              url={i.updateUrl}
                              data={row}
                              onReload={async () => {
                                await getData()
                                modal.destroyAll()
                              }}
                            />;
                      },
                      preset: 'dialog',
                    })
                  }}
                >
                  {i.title}
                </NButton>
              ))}
              <NButton
                type="info"
                size="small"
                onClick={() => {
                  modal.create({
                    title: '编辑',
                    transformOrigin: 'center',
                    content: () => (
                      <EditForm
                        form={props.form}
                        url={props.form.updateUrl}
                        data={row}
                        onReload={async () => {
                          await getData()
                          modal.destroyAll()
                        }}
                      />
                    ),
                    preset: 'dialog',
                  })
                }}
              >
                编辑
              </NButton>
              <NPopconfirm
                positiveText="确认"
                negativeText="取消"
                onPositiveClick={async () => {
                  await http.delete(props.deleteUrl, {
                    params: {
                      id: row.id,
                    },
                  })
                  message.success('删除成功')
                  await getData()
                }}
                v-slots={{
                  default: () => '确定要删除吗？',
                  trigger: () => (
                    <NButton type="error" size="small">
                      删除
                    </NButton>
                  ),
                }}
              >
              </NPopconfirm>
            </NSpace>
          )
        },
      },
    ]

    const hasAction = ref(props.hasAction ?? true)
    const isPageQuery = ref(props.isPageQuery ?? true)
    const data = ref([])
    const loading = ref(false)

    const createColumns = () => [
      basicColumns[0],
      ...(props.columns ?? []),
      hasAction.value
        ? props.columns?.find((i: any) => i.key === 'actions') || basicColumns[1]
        : false,
    ]


    async function getData(page = 1, pageSize = 10) {
      data.value = []
      loading.value = true
      if (isPageQuery.value) {
        const { records, totalPage } = await getListByPage(
          props.getUrl,
          page,
          pageSize
        )
        pagination.value.pageCount = totalPage
        data.value = records.map((i) => ({
          ...i,
          unquireId: Math.random(),
        }))
        loading.value = false
      } else {
        data.value = await getList(props.getUrl)
        loading.value = false
      }
    }

    onMounted(async () => {
      await getData()
    })

    async function updatePage(page: number) {
      await getData(page)
    }

    function handleAdd(item) {
      modal.create({
        title: '新增',
        transformOrigin: 'center',
        content: () => (
          <EditForm
            form={item.form}
            type="post"
            url={item.form.addUrl}
            onReload={async () => {
              await getData()
              modal.destroyAll()
            }}
          />
        ),
        preset: 'dialog',
      })
    }

    function handleClick(item) {
      if (item.type === 'add' || item.type === 'put') {
        handleAdd(item)
      }
    }

    return () => (
      <>
        <n-flex justify="end" p-2>
          {props.form?.button?.map((item, index) => (
            <NButton
              key={index}
              type="primary"
              onClick={() => handleClick(item)}
            >
              {item.text}
            </NButton>
          ))}
        </n-flex>
        <admin-table
          data={data.value}
          columns={createColumns().filter(Boolean)}
          loading={loading.value}
          pagination={pagination.value}
          rowKey={props.rowKey || 'id'}
          onUpdatePage={updatePage}
        />
      </>
    )
  },
})
