import { FormContexts } from '../../store/context';
import { FormContext } from '../../types/types';
import styles from './Summary.module.scss'
import {useContext} from 'react'

const Summary = () => {
    const {finish,newSelectArr,newAddonsArr,isYearly,onActive,idRight} =useContext(FormContexts) as FormContext;


    const totalPrice = finish.filter((item: { priceYear: number; })=>item.priceYear).reduce(
		(sum: number, obj: { priceMounth: number , priceYear: number  }) => {
            if(isYearly) {    
                    return sum+obj.priceYear
            }else {           
                return  sum+obj.priceMounth
            }
                
        },0
	);
    
    
  return (
    <div className={styles.main}>
        <h2>Finishing up</h2>
        <p>Double-check everything looks OK before confirming</p>
        <div className={styles.wrapper}>
           {newSelectArr.map((item,index)=> {
            if (item.isActive) {
                return <div className={styles.plan} key={index}>
                    <div className={styles.planName}>
                        <p className={styles.planText}>{item.name}({isYearly? 'Yearly': 'Mounthly'})</p>
                        <p className={styles.planChange} onClick={()=>{onActive(idRight-2)}}>Change</p>
                    </div>
                    <p className={styles.planPrice}>{isYearly? `$${item.priceYear}/yr`: `$${item.priceMounth}/mo`}</p>
                </div>
            }
           })}
            <span className={styles.border}></span>
            {newAddonsArr && newAddonsArr.map((item,index)=> {
                   if(item.isActive) {
                    return <div className={styles.addons} key={index}>
                    <p className={styles.addonsText}>{item.title}</p>
                    <p className={styles.addonsPrice}>{isYearly? `$${item.priceYear}/yr`: `$${item.priceMounth}/mo`}</p>
                    </div>
                   }
                })}
            
        </div>
        <div className={styles.sum}>
                <p className={styles.sumText}>Total per year</p>
                <p className={styles.sumPrice}>{isYearly? `$${totalPrice}/yr`: `$${totalPrice}/mo`}</p>
        </div>
                {/* confrim finish array */}
        <button  className={styles.summaryButton}>Confirm</button>
        <button onClick={()=> {onActive(idRight-1)}}  className={styles.summaryGoBackButton}>Go Back</button>
    </div>
  )
}

export default Summary  