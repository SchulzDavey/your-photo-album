'use client';

import React, { PropsWithChildren, useEffect, useState } from 'react';

const Hydrate = ({ children }: PropsWithChildren) => {
  const [hydrate, setHydrate] = useState(false);

  useEffect(() => {
    setHydrate(true);
  }, [hydrate]);

  if (hydrate) {
    return <>{children}</>;
  }
};

export default Hydrate;
