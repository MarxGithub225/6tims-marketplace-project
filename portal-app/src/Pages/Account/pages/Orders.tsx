/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import useOrder from "../../../hooks/useOrder";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Order, PaginationOptionOrder } from "../../../sdks/order-v1/utils/DataSchemas";
import { AuthContext } from "../../../context/auth";
import { Pagination } from "../../../sdks/GlobalDataSchemas";
import moment from "moment";

function Orders() {
    const { signOut, sessionInfo, authStatus } = useContext(AuthContext)
    const { client } = useOrder()
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [meta, setMeta] = useState<any> (null)

    const { data, isLoading, isFetching, isError, fetchNextPage }: any =
    useInfiniteQuery({
        queryKey: ['MyOrdersData', page, limit],
        queryFn: async ({ pageParam}: any) => {
            let filter: PaginationOptionOrder = {page: pageParam, limit: limit, orderBy: sessionInfo?.userInfo?.id}
            let result: Pagination<Order> = await client.getPublishedOrders(filter)
            setMeta({
                hasNextPage : result?.hasNextPage,
                hasPrevPage : result?.hasPrevPage,
                limit : result?.limit,
                nextPage : result?.nextPage,
                page : result?.page,
                pagingCounter : result?.pagingCounter,
                prevPage : result?.prevPage,
                totalDocs : result?.totalDocs,
                totalPages : result?.totalPages
            })
            return result?.docs
        },
        initialPageParam: 1,
        getNextPageParam(lastPage: any, allPages: any) {
          return lastPage?.length > 0 ? allPages?.length + 1 : undefined;
        }
    })
  return <section className="">
  <div className="container-fluid">
    <div className="row">
    {data &&<div className="col-md-12">
        <div className="table-ranking mt-[30px] ">
          <div className="flex th-title">
            
            <div className="column">
              <h3>Coût</h3>
            </div>
            <div className="column">
              <h3>Frais</h3>
            </div>
            <div className="column">
              <h3>Payement</h3>
            </div>
            <div className="column">
              <h3>Status</h3>
            </div>
            <div className="column">
              <h3>Produits</h3>
            </div>
            <div className="column">
              <h3>Date</h3>
            </div>
          </div>
          {(data?.pages) ? <>
            {data.pages.map((page: Array<Order>) => (<>
            {page?.map((order: Order) => {
                return  <div className="fl-blog fl-item2">
                <div className="item flex">
                  <div className="column">
                    <span>{order.cost}</span>
                  </div>
                  <div className="column td4">
                    <span>{order.fees}</span>
                  </div>
                  <div className="column td3">
                    <span>{order.paidMethod}</span>
                  </div>
                  <div className="column td2">
                    <span>{order.orderStatus}</span>
                  </div>
                  <div className="column td5">
                    <span>{order.products.length} produit(s)</span>
                  </div>
                  <div className="column td6">
                    <span>{moment(order.updatedAt).format('DD MM YYYY à HH:mm:ss')}</span>
                  </div>
                </div>
              </div>
            })}</>))}
          </>: <></>}
          
        </div>
        {meta?.hasNextPage && <div className="col-md-12 wrap-inner load-more text-center">
        <a href="" 
        onClick={(e: any) => {
            e.preventDefault()
            fetchNextPage()
        }}
        className="sc-button loadmore fl-button pri-3"><span>Charger plus</span></a>
        </div>}
      </div>}
    </div>
  </div>
</section>
;
}

export default Orders;
