import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as HelpSvg } from 'assets/svg/help_yellow.svg';
import { ReactComponent as ArrowSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as PointSvg } from 'assets/svg/point.svg';
import { ReactComponent as PolygoneSvg } from 'assets/svg/polygon.svg';
import CollectifSvg from 'assets/svg/collectif.svg';
import IndividuelSvg from 'assets/svg/individuel.svg';
import SelectorTest from 'components/design-system/SelectorTest';
import useWindowSize from 'hooks/useWindowSize';
import classNames from 'common/utils/classNames';
import useMediaQuery from 'hooks/useMediaQuery';
import Flicking from '@egjs/react-flicking';
import { Fade } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import { useInterest } from 'common/requests/interests';
import ParcoursInterestsLayout from 'layouts/ParcoursInterestsLayout/ParcoursInterestsLayout';
import AppLoader from 'components/ui/AppLoader';

type InterestContent = {
  id: string;
  title: string;
};

type InterestProps = {
  position: number;
  content: InterestContent[];
  onToggleInterest: (interestId: string) => void;
  selectedInterests: string[];
};

const FamilyCardForMobile = ({ position, content, onToggleInterest, selectedInterests }: InterestProps) => {
  const [width, setWidth] = useState(0);
  const sizeWindow = useWindowSize();

  useEffect(() => {
    const getWidth = sizeWindow.width;
    setWidth(getWidth);
  }, [sizeWindow]);

  const renderPolygone = () => {
    const poly = [];

    for (let i = 0; i < 5; i++) {
      if (i === position) {
        poly.push(<PolygoneSvg key={i} width={50} />);
      } else {
        poly.push(<div key={i} style={{ width: 50 }} />);
      }
    }

    return poly;
  };

  return (
    <div
      className="relative"
      style={{
        transform: `translate(${width * position}px, 0px)`,
      }}
    >
      <div
        className="mt-10 bg-white rounded-lg absolute w-full"
        style={{ filter: 'drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.15))' }}
      >
        <div style={{ zIndex: 100 }} className="absolute -top-7 flex justify-around w-full">
          {renderPolygone()}
        </div>
        <div className="z-30 relative p-3">
          {content &&
            content.map((v) => (
              <div className="mb-3">
                <SelectorTest
                  key={v.id}
                  color="yellow"
                  checked={selectedInterests.includes(v.id)}
                  onClick={(value) => onToggleInterest?.call(null, v.id)}
                >
                  {v.title}
                </SelectorTest>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const FamilyCardForDesktop = ({ position, content, onToggleInterest, selectedInterests }: InterestProps) => {
  const [width, setWidth] = useState(0);
  const sizeWindow = useWindowSize();

  useEffect(() => {
    const getWidth = sizeWindow.width;
    setWidth(getWidth);
  }, [sizeWindow]);

  const renderPolygone = () => {
    const poly = [];

    for (let i = 0; i < 5; i++) {
      if (i === position) {
        poly.push(<PolygoneSvg width={50} />);
      } else {
        poly.push(<div style={{ width: 50 }} />);
      }
    }

    return poly;
  };

  return (
    <div className="mt-10 bg-white rounded-lg" style={{ filter: 'drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.15))' }}>
      <div style={{ zIndex: 100 }} className="absolute -top-7 flex justify-between w-full">
        {renderPolygone()}
      </div>
      <div className="z-30 relative p-6 grid grid-cols-3 gap-2">
        {content &&
          content.map((v) => (
            <div
              key={v.id}
              className={classNames(
                'text-center py-5 px-5 border-2 rounded-md cursor-pointer w-50',
                selectedInterests.includes(v.id)
                  ? 'bg-lena-yellow border-lena-yellow-dark'
                  : 'bg-lena-yellow-light border-transparent',
              )}
              onClick={(value) => onToggleInterest?.call(null, v.id)}
            >
              {v.title}
            </div>
          ))}
      </div>
    </div>
  );
};

type Props = {
  onBack: () => void;
  onStep: (familyId: string, selected: string[]) => void;
  familyId: string;
};

const SelectInterest = ({ onStep, onBack, familyId }: Props) => {
  const axisRef = useRef<any>(null);
  const [translate, setTranslate] = useState(0);
  const [rangeValue, setRangeValue] = useState(0);
  const [width, setWidth] = useState(0);
  const sizeWindow = useWindowSize();
  const isDesktop = useMediaQuery('md');
  const plugins: any = [new Fade('', 0.7)];
  const flickingRef = useRef<any>();
  const [getInterestCall, getInterestState] = useInterest();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  useEffect(() => {
    if (familyId) getInterestCall({ variables: { familyId } });
  }, [familyId]);

  useEffect(() => {
    async function update(index: number) {
      if (isDesktop) {
        try {
          await flickingRef.current.moveTo(index);
        } catch (err) {
          /* if (err instanceof FlickingError) {
            if (err.code === ERROR_CODE.ANIMATION_ALREADY_PLAYING) {
              console.error('Animation is already playing!');
            } else if (err.code === ERROR_CODE.ANIMATION_INTERRUPTED) {
              console.error('Animation is interrupted by user.');
            }
          } */
        }
      } else {
        // TODO: when changing from desktop to mobile, it becomes misaligned
        setTranslate(width * index);
      }
    }

    update(rangeValue);
  }, [isDesktop, width, rangeValue]);

  const handleChange = async (e: any) => {
    setRangeValue(e);
  };

  useEffect(() => {
    const widthWindow = sizeWindow.width;
    setWidth(widthWindow);
    setTranslate(widthWindow * rangeValue);
  }, [sizeWindow]);

  const handleToggleInterest = (interestId: string) => {
    const updatedArray = selectedInterests.includes(interestId)
      ? selectedInterests.filter((v) => v !== interestId)
      : [...selectedInterests, interestId];
    setSelectedInterests(updatedArray);
  };

  const handleValidateInterests = () => {
    onStep?.call(null, familyId, selectedInterests);
  };

  return (
    <ParcoursInterestsLayout showHeader={isDesktop}>
      <div
        className="flex flex-col flex-1 min-h-screen md:min-h-0 h-full flex flex-col overflow-x-hidden"
        style={{ backgroundColor: isDesktop ? '#fff' : '#e5e5e5' }}
      >
        <header className="bg-white pt-2 shadow-md">
          <div className="flex justify-between items-center container">
            <button
              className="flex items-center space-x-2 focus:outline-none focus:ring-0"
              onClick={() => onBack.call(null)}
            >
              <ArrowSvg />
              <span className="mt-1 text-sm text-lena-blue-dark">Retour</span>
            </button>
            {!isDesktop && (
              <button className="focus:ring-0 focus:outline-none">
                <HelpSvg />
              </button>
            )}
          </div>
          <h2
            className={classNames(
              'text-lena-blue-dark text-center text-sm px-7 mx-auto py-3',
              !isDesktop ? 'font-bold' : 'text-md pb-5',
            )}
          >
            {isDesktop ? (
              <>
                Faites glisser le curseur le long de l'axe et <br />
                s??lectionnez autant de centres d'int??r??ts que vous le souhaitez :
              </>
            ) : (
              <>Faites glisser le curseur et s??lectionnez autant de centres d'int??r??ts que vous le souhaitez :</>
            )}
          </h2>
        </header>

        <div className={classNames('flex-1', isDesktop ? 'bg-lena-gray-light-2 py-14' : 'container py-8')}>
          {getInterestState.loading && <AppLoader />}
          {getInterestState.data && (
            <>
              <div className="relative">
                <div className="flex items-center flex-col w-full">
                  <div
                    style={{ width: isDesktop ? 'calc(80% + 110px)' : 'calc(80% + 60px)' }}
                    className={classNames(
                      'flex justify-between text-center text-lena-blue-dark mx-4 relative',
                      isDesktop && 'mb-3',
                    )}
                  >
                    <span className="flex flex-col items-center">
                      <img className="mb-1" src={CollectifSvg} alt="Svg" />
                      <span>{getInterestState.data?.interest.title.split(' - ')[0]}</span>
                    </span>
                    <span className="flex flex-col items-center">
                      <img className="mb-1" src={IndividuelSvg} alt="Svg" />
                      <span>{getInterestState.data?.interest.title.split(' - ')[1]}</span>
                    </span>
                  </div>
                </div>
                <div ref={axisRef} className="w-full bg-lena-yellow-light h-3 mt-2 rounded-full relative">
                  <div className="absolute w-full flex justify-center" style={{ marginTop: 9 }}>
                    <input
                      max={(getInterestState.data?.interest.cursors.length || 1) - 1}
                      min={0}
                      step={isDesktop ? 1 : 1}
                      value={rangeValue}
                      onChange={(e) => handleChange(e.currentTarget.value)}
                      type="range"
                      className="w-full thumb thumb--left"
                      style={{ width: 'calc(80% + 40px)' }}
                    />
                  </div>
                  <div className="flex absolute w-full justify-center " style={{ marginTop: -3.7 }}>
                    {getInterestState.data?.interest.cursors.map((v, index) => (
                      <div
                        key={`${index * 2}-a`}
                        style={{ width: `${100 / (getInterestState.data?.interest?.cursors?.length || 1)}%` }}
                        className="flex justify-center"
                      >
                        <PointSvg
                          height={20}
                          width={20}
                          className="cursor-pointer"
                          onClick={() => handleChange(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {!isDesktop && (
                <div
                  className="relative mt-1"
                  style={{
                    transform: `translate(-${translate}px, 0px)`,
                  }}
                >
                  {getInterestState.data?.interest.cursors.map((v, index) => (
                    <FamilyCardForMobile
                      key={`${index * 2}-b`}
                      content={v}
                      position={index}
                      onToggleInterest={handleToggleInterest}
                      selectedInterests={selectedInterests}
                    />
                  ))}
                </div>
              )}
              {isDesktop && (
                <div>
                  {getInterestState.data && (
                    <Flicking
                      circularEnabled={false}
                      onChanged={(e) => setRangeValue(e.currentTarget.index)}
                      defaultIndex={0}
                      ref={flickingRef}
                      horizontal={true}
                      plugins={plugins}
                    >
                      {getInterestState.data?.interest.cursors.map((v, index) => (
                        <div key={`${index * 3}-a`} className="relative flickingDiv">
                          <FamilyCardForDesktop
                            content={v}
                            position={index}
                            onToggleInterest={handleToggleInterest}
                            selectedInterests={selectedInterests}
                          />
                        </div>
                      ))}
                    </Flicking>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <div className="fixed bottom-0 left-0 right-0 md:relative md:py-4 md:flex md:justify-center">
          <button
            className={`focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3
            text-center font-bold text-lg md:w-96 md:rounded-md disabled:opacity-50`}
            onClick={handleValidateInterests}
            disabled={selectedInterests.length <= 0}
          >
            Valider
          </button>
        </div>
      </div>
    </ParcoursInterestsLayout>
  );
};

export default SelectInterest;
