/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import PageHeader from "../../GlobalScreens/PageHeader";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProduct from "../../hooks/useProduct";
import { Product } from "../../sdks/product-v1/utils/DataSchemas";
import { API_FILE_URL } from "../../utilities/constants";
import moment from "moment";

function ProductHistorical() {
  const {id} = useParams<any>()
  const { client } = useProduct()
  const [historicals, setHistorical] = useState<Array<any>>([])
  const [filterState, setFilterState] = useState<string>("");

  const { data, isLoading, isFetching, isError }: any =
  useQuery({
      queryKey: ['productDetails', id],
      queryFn: async () => {
          if(id) {
            const result: Product = await client.getProductById(id)
            setHistorical(result.historical)
            return result
          }else return null
      }
  })

  const getMessage = (type: string): any => {
    switch (type) {
      case 'view':
        return <>a <strong>vu</strong> ce produit</>
        break;
      case 'like':
          return <>a <strong>aimé</strong> ce produit</>
          break;
      case 'comment':
            return <>a <strong>commenté</strong> ce produit</>
            break;
      case 'sell':
              return <>a <strong>acheté</strong> ce produit</>
              break;
      default:
          return <>a <strong>vu</strong> ce produit</>
        break;
    }
  }

  const getIcon = (type: string): any => {
    switch (type) {
      case 'view':
        return <div className="button-active icon-fl-users-filled" />
        break;
      case 'like':
          return <div className="button-active icon-fl-heart-filled" />
          break;
      case 'comment':
            return <div className="button-active icon-fl-discount" />
            break;
      case 'sell':
              return <div className="button-active icon-fl-credit-card" />
              break;
      default:
          return <div className="button-active icon-fl-users-filled" />
        break;
    }
  }

  useEffect(() => {
    if(data) {
      const results = data.historical?.filter((hist: any) => hist.type === filterState)
      if(filterState)
      setHistorical(results)
      else setHistorical(data.historical)
    }
  }, [filterState])
  return <>
  <PageHeader
  header="Historique du produit"
  />
    <section className="tf-activity s1 tf-section">
  <div className="themesflat-container">
    <div className="row">
      <div className="col-lg-8 col-md-8 col-12">
        {!historicals?.length ? <span className="text-[18px]" >Aucune données !</span> : <>{historicals
        ?.sort((a: any, b: any) => b?.actedAt - a?.actedAt)
        ?.map((historic: any, key: number) => {
          return <div className="sc-card-activity style1" key={key} >
          <div className="content">
            <div className="media">
            <img src={historic?.owner?.image ? `${API_FILE_URL}/icons/${historic?.owner?.image?.path}` : `assets/images/avatar/avt-28.jpg`} alt={`6tims - tims group | historic`} />
            </div>
            <div className="infor">
              {historic?.owner && <h3> <>{historic?.owner?.fullName} </></h3>}
              <div className="status">{getMessage(historic.type)}</div>
              <div className="time">{moment(historic?.actedAt).fromNow()}</div>
            </div>
          </div>
          {getIcon(historic.type)}
        </div>
        })
        }  
           </>
        }                      
      </div>
      <div className="col-lg-4 col-md-4 col-12">
        <div id="side-bar" className="side-bar style-2">
          
          <div className="widget widget-filter style-2 mgbt-0">
            <h3 className="title-widget">Filtrer</h3>
            <ul className="box-check">
              <li><a  
              onClick={(e: any) => {
                e.preventDefault()
                setFilterState("")
              }}
              className="box-widget-filter"><i className="icon-fl-sort-filled" />Tout</a></li>
              <li><a  
              onClick={(e: any) => {
                e.preventDefault()
                setFilterState("view")
              }}
              className="box-widget-filter"><i className="icon-fl-users-filled" />Vues</a></li>
              <li><a  
              onClick={(e: any) => {
                e.preventDefault()
                setFilterState("sell")
              }}
              className="box-widget-filter"><i className="icon-fl-credit-card" />Achats</a></li>
              <li><a  
              onClick={(e: any) => {
                e.preventDefault()
                setFilterState("comment")
              }}
              className="box-widget-filter"><i className="icon-fl-discount" />Commentaires</a></li>
              <li><a  
              onClick={(e: any) => {
                e.preventDefault()
                setFilterState("like")
              }}
              className="box-widget-filter"><i className="icon-fl-heart-filled" />Favoris</a></li>
            </ul>
          </div>
        </div>{/*/.side-bar*/}
      </div>
    </div>
  </div>
</section>

  </>;
}

export default ProductHistorical;
