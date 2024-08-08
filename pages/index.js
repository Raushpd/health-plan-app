import { useState } from 'react';


const plans = [
  { name: 'Aetna', cost: 50, logo: 'assets/aetna.png' },
  { name: 'Cigna', cost: 100, logo: 'assets/cigna.jpg' },
  { name: 'Medicaid', cost: 500, logo: 'assets/medicaid.png' },
  { name: 'Medicare', cost: 500, logo: 'assets/medicare.png' },
];

export default function Home() {
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [providerType, setProviderType] = useState('Group');
  const [numProviders, setNumProviders] = useState(1);

  const handlePlanChange = (plan) => {
    setSelectedPlans((prev) =>
      prev.includes(plan)
        ? prev.filter((p) => p !== plan)
        : [...prev, plan]
    );
  };

  const handleProviderChange = (e) => {
    setProviderType(e.target.value);
  };

  const handleNumProvidersChange = (e) => {
    e.target.value = e.target.value.replace(/^0+/, '');
    setNumProviders(Number(e.target.value))
  };

  const estimatedCost = selectedPlans.reduce(
    (total, plan) => total + plan.cost * numProviders,
    0
  );

  return (
    <div className="container">
      <h1>Health Plans</h1>
      <div className="plans">
        {plans.map((plan) => (
          <div key={plan.name} className="plan">
            <input
              type="checkbox"
              id={plan.name}
              onChange={() => handlePlanChange(plan)}
            />
            <img src={plan.logo} alt="img" height={90} width={200} /> - <label> &nbsp; ${plan.cost}</label>


          </div>
        ))}
      </div>
      <div className="provider-type">
        <label>
          <input
            type="radio"
            value="Group"
            checked={providerType === 'Group'}
            onChange={handleProviderChange}
          />
          Group
        </label>
        <label>
          <input
            type="radio"
            value="Solo"
            checked={providerType === 'Solo'}
            onChange={handleProviderChange}
          />
          Solo
        </label>
      </div>
      <div className="num-providers">
        <label>
          Number of Providers:
          <input
            type="number"
            value={numProviders}
            onChange={handleNumProvidersChange}
            min="1"
          />
        </label>
      </div>
      <div
        className="estimated-cost"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Estimated Cost: ${estimatedCost}
      </div>
    </div>
  );
}
